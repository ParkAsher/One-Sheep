class DriverConatroller {
    // 이미지 업로드
    imageUpload = async (req, res, next) => {
        return res.status(200).json({ success: true, filePath: res.req.file.location });
    };
}

module.exports = DriverConatroller;
