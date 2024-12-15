const QrCode = require('qrcode');

function formatData(data){
    const qrCodeText = `Resume URL: ${data.url}`;
    return qrCodeText;
}

async function generateQrcode(qrCodeText, format){
    const options = {
        errorCorrectionLevel: 'M',
        type: format === 'png' ? 'image/png' : 'image/jpeg',
        margin : 1
    };
    const qrcodeBuffer  = await  QrCode.toBuffer(qrCodeText, options);
    return qrcodeBuffer;
}

exports.generatorQR = async (req, res) => {
    try{
        const { data, format } = req.body;
        console.log("data ", data)
        const qrCodeText=  formatData(data);
        const qrcodeBuffer = await generateQrcode(qrCodeText, format);
        res.setHeader('Content-Disposition' , `attachment; filename="qrcode.${format}"`);
        res.type(`image/${format}`).send(qrcodeBuffer);
    }
    catch(err){
        console.log("error generating qrcode " ,err)
        res.status(500).send({error : "error generating qrcode"})
    }
}