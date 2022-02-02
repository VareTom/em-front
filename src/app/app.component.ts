import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// Enums
import { LanguageCodes } from '../shared/enums/LanguageCodes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '`Em';

  constructor(private translate: TranslateService) {
    const storedLanguage = localStorage.getItem('languageCode');
    translate.setDefaultLang(LanguageCodes.FR);
    translate.use(storedLanguage ?? LanguageCodes.FR);
  }
}
