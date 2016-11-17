import { EventsitePage } from './app.po';

describe('eventsite App', function() {
  let page: EventsitePage;

  beforeEach(() => {
    page = new EventsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
