import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { MenuHeaderComponent } from './menu-header.component';
import { MenuHeaderModule } from '../../menu-header.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThemeService } from 'src/app/services/theme.service';

xdescribe("MenuHeaderComponent", () => {

  let menuHeader: MenuHeaderComponent;
  let fixture: ComponentFixture<MenuHeaderComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {

    let themeServiceSpy = jasmine.createSpyObj('ThemeService', ['getDarkThemeOn$'])

    TestBed.configureTestingModule({
      imports: [MenuHeaderModule],
      providers: [{provide: ThemeService, useValue: themeServiceSpy}]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MenuHeaderComponent);
        menuHeader = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
  }));

  it("should create the component", () => {

    expect(menuHeader).toBeTruthy("The component was not initialized");
  });

  it("should display the title of the menu", () => {
    menuHeader.title = "Cafe";
    fixture.detectChanges();

    const title = debugElement.query(By.css("#title:first-child"));
    expect(title).toBeTruthy("Could not find title");
    expect(title.nativeElement.textContent.trim()).toBe("Cafe");
  });


});
