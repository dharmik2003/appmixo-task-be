const generateRiskScore = (text = "") => {
    let riskScore = 0;
    const cleanText = (text || "").trim();

    if (cleanText.length === 0) return 0;

    const excessivePunctuation = cleanText.match(/[!?]{3,}/g);
    if (excessivePunctuation) {
        riskScore += excessivePunctuation.length * 10;
    }

    const words = cleanText
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    const totalWords = words.length;
    const wordCounts = {};
    words.forEach((w) => {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
    });

    Object.entries(wordCounts).forEach(([word, count]) => {
        if (word.length < 2) return;

        const ratio = count / totalWords;

        if (count >= 4) {
            riskScore += (count - 3) * 5;
        }

        if (count >= 2 && ratio >= 0.4) {
            riskScore += Math.round(ratio * 30);
        }
    });

    const repeatedChars = cleanText.match(/(.)\1{3,}/g);
    if (repeatedChars) {
        riskScore += repeatedChars.length * 8;
    }

    const capsWords = words.filter((w) => w.length > 2);
    const allCapsWords = cleanText
        .split(/\s+/)
        .filter((w) => w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w));
    if (capsWords.length > 0 && allCapsWords.length / capsWords.length > 0.5) {
        riskScore += 15;
    }

    if (/(https?:\/\/|www\.)\S+/i.test(cleanText)) {
        riskScore += 25;
    }

    if (/\b\d{10}\b|[\w.-]+@[\w.-]+\.\w+/.test(cleanText)) {
        riskScore += 20;
    }

    if (cleanText.length < 10) {
        riskScore += 5;
    }

    const bannedWords = ["scam", "fraud", "fake", "cheat"];
    bannedWords.forEach((bad) => {
        if (new RegExp(`\\b${bad}\\b`, "i").test(cleanText)) {
            riskScore += 15;
        }
    });

    riskScore = Math.min(100, Math.max(0, riskScore));

    return riskScore;
};

module.exports = generateRiskScore;