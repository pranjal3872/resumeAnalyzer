const { extractPDFText } = require("../services/pdfService");
const { analyzeResume } = require("../services/ai-service");
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded",
      });
    }

    const text = await extractPDFText(req.file.path);

    const analysis = await analyzeResume(text);

    res.status(200).json({
    success: true,
    analysis,
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};