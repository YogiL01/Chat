const {SigninPagePO}=require('./SigninPagePO');
class POManager

{
    constructor(page)
    {
        this.page=page;
        this.signinPage=new SigninPagePO(page);
    }  
    getSigninPage()
    {
        return this.signinPage;
    }
}
module.exports={POManager};