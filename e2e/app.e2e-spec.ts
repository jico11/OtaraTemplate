import { OtaraTemplatePage } from './app.po';

describe('otara-template App', () => {
  let page: OtaraTemplatePage;

  beforeEach(() => {
    page = new OtaraTemplatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
