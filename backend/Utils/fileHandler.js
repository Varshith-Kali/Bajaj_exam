const FileType = require('file-type');

exports.processFile = async (base64String) => {
    const buffer = Buffer.from(base64String, 'base64');
    
    const fileInfo = await FileType.fromBuffer(buffer);
    
    if (!fileInfo) {
        throw new Error('Invalid file type');
    }

    return {
        file_valid: true,
        file_mime_type: fileInfo.mime,
        file_size_kb: (buffer.length / 1024).toFixed(2)
    };
};