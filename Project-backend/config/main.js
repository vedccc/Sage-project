module.exports = (port) => {
    const env = process.env;
    var baseURL = env.BASE_URL;
    const config = {
        pages: 10,
        isLive: env.live,
        tokenExpDays: '1D',
        EmployeeValidDays: '365',
        websiteName: env.WEBSITE_NAME,
        assetsImage: env.BASE_URL + 'public/assets/images/',
        adminAssetsJs: env.BASE_URL + 'public/assets/js/custom/',
        user_avatar: {
            base_path: './public/uploads/user/',
            path: baseURL + 'public/uploads/user/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        },
        product_image:{
            base_path: './public/uploads/product/',
            path: baseURL + 'public/uploads/product/',
            default_path: baseURL + 'public/assets/images/blank-img.png'
        }
    };
    return config;
}