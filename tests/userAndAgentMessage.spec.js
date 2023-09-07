import { test, expect } from '@playwright/test';
const {POManager}= require('../pageObjects/POManager');

test('User and Agent chat box message validation', async ({ page,browser }) => {
  //Declaring variables and creating objects
  const messageFromUser='Need a help.';
  const messageFromAgent='Happy to help!';
  const messageWaitTime=2000;
  const page1=await browser.newPage();
  const poManager1 =new POManager(page1);
  const poManager =new POManager(page);
  //Open Test site and enter message in ChatWay
  const testSitesignIn=poManager.getSigninPage();
  await testSitesignIn.goToPozhilGarden();
  await testSitesignIn.chatWayLauncher.click();
  const frame=testSitesignIn.chatWayPopUpFrame;
  await frame.locator("textarea[placeholder='Write your message...']").fill(messageFromUser);
  await page.waitForTimeout(messageWaitTime);
  await frame.locator("textarea[placeholder='Write your message...']").click();
  await frame.locator("textarea[placeholder='Write your message...']").press("Enter");
  //Open ChatWay, signin and validate and respond to the user message
  const chatWaySignIn=poManager1.getSigninPage();
  await chatWaySignIn.goToChatWay();
  await chatWaySignIn.signinToChatWay();
  await chatWaySignIn.unresolvedTab.click();
  await page1.waitForTimeout(messageWaitTime);
  await page1.getByText(messageFromUser).click();
  const check1=await page1.locator('p').filter({ hasText: messageFromUser }).isVisible();
  //Validation of user message
  expect(check1,true);
  //Reply to user message
  await page1.waitForTimeout(messageWaitTime);
  await chatWaySignIn.agentWriteMessageLocator.click();
  await chatWaySignIn.agentWriteMessageLocator.fill(messageFromAgent);
  await chatWaySignIn.agentWriteMessageLocator.click();
  await chatWaySignIn.agentWriteMessageLocator.press("Enter");
  //Validation of agent message
  //Waiting and using try catch as test site loads slow
  await page1.waitForTimeout(messageWaitTime);
  try {
    const check2=await frame.locator('p').filter({ hasText: messageFromAgent }).isVisible();
    expect(check2,true);
  } catch (error) {
    const check2=await frame.locator('p').filter({ hasText: messageFromAgent }).isVisible();
    expect(check2,true);
  }
});