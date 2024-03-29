import {
  Directive,
  OnDestroy,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[cdkDetailRow]"
})
export class CdkDetailRowDirective implements OnDestroy {
  private row: any;
  private tRef: TemplateRef<any>;
  private opened: boolean;

  @HostBinding("class.expanded")
  get expended(): boolean {
    debugger;
    return this.opened;
  }

  @Input()
  set cdkDetailRow(value: any) {
    if (value !== this.row) {
      this.row = value;
      // this.render();
    }
  }

  @Input("cdkDetailRowTpl")
  set template(value: TemplateRef<any>) {
    debugger;
    if (value !== this.tRef) {
      this.tRef = value;
    }
  }

  @Output() toggleChange = new EventEmitter<CdkDetailRowDirective>();

  constructor(public vcRef: ViewContainerRef) {
    debugger;
  }

  @HostListener("click")
  onClick(): void {
    debugger;
    this.toggle();
  }

  public toggle(): void {
    debugger;
    if (this.opened) {
      this.vcRef.clear();
    } else {
      this.render();
    }
    this.opened = this.vcRef.length > 0;
    this.toggleChange.emit(this);
  }

  private render(): void {
    this.vcRef.clear();
    if (this.tRef && this.row) {
      this.vcRef.createEmbeddedView(this.tRef, { $implicit: this.row });
    }
  }

  ngOnDestroy(): void {
    console.log(this.row, "Inside onDestroy");
    this.row.close = false;
  }
}
