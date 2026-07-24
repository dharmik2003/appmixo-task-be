const analyzeReviewText = (text = "") => {
    let riskScore = 0;
    const flags = [];

    const cleanText = (text || "").trim();
    if (cleanText.length === 0) {
        return { riskScore: 0, flags: [] };
    }

    if (/[!?]{3,}/.test(cleanText)) {
        riskScore += 10;
        flags.push("Multiple exclamation/question marks used");
    }

    if (/(.)\1{3,}/.test(cleanText)) {
        riskScore += 10;
        flags.push("Repeated characters detected (e.g. loooove)");
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

    const hasRepeatedWord = Object.entries(wordCounts).some(([word, count]) => {
        if (word.length < 2) return false;
        const ratio = count / totalWords;
        return count >= 3 || (count >= 2 && ratio >= 0.4);
    });

    if (hasRepeatedWord) {
        riskScore += 15;
        flags.push("Repeated / spammy words detected");
    }

    const letters = cleanText.replace(/[^a-zA-Z]/g, "");
    const upperLetters = cleanText.replace(/[^A-Z]/g, "");
    if (letters.length > 5 && upperLetters.length / letters.length > 0.5) {
        riskScore += 15;
        flags.push("Excessive uppercase characters");
    }

    if (cleanText.length < 10 || totalWords <= 1) {
        riskScore += 10;
        flags.push("Very short or meaningless review text");
    }

    const bannedWords = ["scam", "fraud", "fake", "cheat", "spam"];
    const foundBannedWord = bannedWords.find((bad) =>
        new RegExp(`\\b${bad}\\b`, "i").test(cleanText)
    );
    if (foundBannedWord) {
        riskScore += 20;
        flags.push(`Contains banned/spam word: "${foundBannedWord}"`);
    }

    if (/(https?:\/\/|www\.)\S+/i.test(cleanText)) {
        riskScore += 20;
        flags.push("Contains a URL/link");
    }

    if (/\b\d{10}\b|[\w.-]+@[\w.-]+\.\w+/.test(cleanText)) {
        riskScore += 15;
        flags.push("Contains phone number or email");
    }

    return { riskScore, flags };
};

const checkFrequentAuthorActivity = async ({
    ReviewsModel,
    author,
    productId,
    excludeReviewId = null,
    windowHours = 24,
    maxAllowed = 1
}) => {
    if (!author || !productId) return { riskScore: 0, flags: [] };

    const since = new Date(Date.now() - windowHours * 60 * 60 * 1000);

    const query = {
        author,
        productId,
        createdAt: { $gte: since }
    };

    if (excludeReviewId) {
        query._id = { $ne: excludeReviewId };
    }

    const recentCount = await ReviewsModel.countDocuments(query);

    if (recentCount >= maxAllowed) {
        return {
            riskScore: 25,
            flags: [`Multiple reviews by same author for same product within ${windowHours}h`]
        };
    }

    return { riskScore: 0, flags: [] };
};

const generateRiskScore = async (text, meta = {}) => {
    const textResult = analyzeReviewText(text);

    let riskScore = textResult.riskScore;
    let flags = [...textResult.flags];

    if (meta.ReviewsModel && meta.author && meta.productId) {
        const authorResult = await checkFrequentAuthorActivity(meta);
        riskScore += authorResult.riskScore;
        flags = [...flags, ...authorResult.flags];
    }

    riskScore = Math.min(100, Math.max(0, riskScore));

    return { riskScore, flags };
};

module.exports = generateRiskScore;