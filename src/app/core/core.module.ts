import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./components";
import { ImportOnceModule } from "./modules/import-once.module";

@NgModule({
    imports: [RouterModule, CommonModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
})
// Ensure CoreModule is only imported at the root AppModule level,
// For reusable components, use the SharedModule.
export class CoreModule extends ImportOnceModule {
    public constructor(@SkipSelf() @Optional() parent: CoreModule) {
        super(parent);
    }
}