// src/app/shared/shared-ckeditor.module.ts

import { NgModule } from '@angular/core';
// **CRITICAL: Import CKEditorModule, not CKEditorComponent directly, here**
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CKEditorModule // Import the CKEditorModule provided by the library
  ],
  exports: [
    CKEditorModule // Export it so any standalone component importing SharedCkeditorModule can use <ckeditor>
  ]
})
export class SharedCkeditorModule { }
