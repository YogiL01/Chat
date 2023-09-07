class SigninPagePO{
    
    constructor(page)
    {
        this.page=page;
        this.loginEmailLocator=page.getByPlaceholder('Enter Your Email');
        this.loginPassswordLocator=page.getByPlaceholder('Your Password');
        this.loginInbuttonLocator=page.getByRole('button', { name: 'Sign In' });
        this.chatWayLauncher =page.locator('//*[@class="chatway-launcher"]')
        this.chatWayPopUpFrame=page.frameLocator("#chatway_widget_app");
        this.unresolvedTab=page.locator('//div[@class="chat--filter"]//span[contains(text(),"Unresolved")]/..');
        this.agentWriteMessageLocator=page.locator('//textarea[@placeholder="Write your message..."][@name=""]');
        }
    async  signinToChatWay()
    {
        await this.loginEmailLocator.type('yogesh+10@premio.io');
        await this.loginPassswordLocator.type('Yogesh@1234@');
        await this.loginInbuttonLocator.click()
    }
    async goToChatWay()
    {
        await this.page.goto("https://go.chatway.app/login");
    }
    async goToPozhilGarden()
    {
        await this.page.goto("https://sveltekit-1-git-main-yogesh1-premioio.vercel.app/");
    }

}
module.exports ={SigninPagePO};

