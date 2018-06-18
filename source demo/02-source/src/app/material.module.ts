import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
    imports: [MatButtonModule, MatTooltipModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatAutocompleteModule],
    exports: [MatButtonModule, MatTooltipModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatAutocompleteModule],
})
export class MaterialModule { }