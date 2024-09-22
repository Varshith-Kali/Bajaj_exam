const { processFile } = require('../utils/fileHandler');

const isAlphabet = (char) => /^[A-Za-z]$/.test(char);
const isNumber = (char) => /^[0-9]+$/.test(char);

exports.handlePostRequest = async (req, res, next) => {
    try {
        const { data, file_b64 } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input: 'data' must be an array" });
        }

        const numbers = data.filter(isNumber);
        const alphabets = data.filter(isAlphabet);
        const highestLowercaseAlphabet = alphabets
            .filter(char => char === char.toLowerCase())
            .sort((a, b) => b.localeCompare(a))
            .slice(0, 1);

        let fileInfo = {
            file_valid: false,
            file_mime_type: null,
            file_size_kb: null
        };

        if (file_b64) {
            try {
                fileInfo = await processFile(file_b64);
            } catch (error) {
                console.error("File processing error:", error);
                fileInfo.file_valid = false;
            }
        }

        const response = {
            is_success: true,
            user_id: "john_doe_17091999", // This should be dynamically generated in a real scenario
            email: "john@xyz.com", // This should come from user data in a real scenario
            roll_number: "ABCD123", // This should come from user data in a real scenario
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet,
            ...fileInfo
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
};

exports.handleGetRequest = (req, res) => {
    res.status(200).json({ operation_code: 1 });
};
