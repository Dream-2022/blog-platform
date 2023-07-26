axios.interceptors.request.use(function (config)
{
    const token=localStorage.getItem('token');
    const longt=localStorage.getItem('longt');
    token&&(config.headers.token=`${token}`)
    longt&&(config.headers.longt=`${longt}`)
    return config;
},function(error){
    console.dir(error)
    if(error?.response?.status===401)
    {
        alert('身份验证失败，请重新登录');
        localStorage.clear();
        location.href='login.html'
    }
    return Promise.reject(error);
})
