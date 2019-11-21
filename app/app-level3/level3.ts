import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

import { CdkDetailRowDirective } from "./cdk-detail-row.directive";
import { TableContext } from "../table-context";

/**
 * @title Basic table
 */
@Component({
  selector: "level3",
  // styleUrls: ["table-basic-example.css"],
  templateUrl: "level3.html",
  styleUrls: ["level3.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "void",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("*", style({ height: "*", visibility: "visible" })),
      transition("void <=> *", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
    ])
  ]
})
export class Level3 {
  @ViewChild("pager3") paginator3: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() singleChildRowDetail: boolean;
  @Input()
  set currentPosition(val: TableContext) {
    console.log(val);
    this.dataSource3.data = data3;//.filter(x => x.position === val.Id);
    this.dataSource3.paginator = this.paginator3;
    this.dataSource3.sort = this.sort;
  }
  @Output() disableParent2Scroll = new EventEmitter<any>();
  @Output() enableParent2Scroll = new EventEmitter<any>();
  
  get() {}

  isExpansionDetailRow = (index, row) => row.hasOwnProperty("detailRow");
  displayedColumns3 = ["position", "name", "weight"];
  dataSource3 = new MatTableDataSource();

  constructor(private factory: ComponentFactoryResolver) {}

  ngOnInit() {}

  private openedRow: CdkDetailRowDirective;
  onToggleChange(cdkDetailRow: CdkDetailRowDirective, row): void {
    if (
      this.singleChildRowDetail &&
      this.openedRow &&
      this.openedRow.expended
    ) {
      this.openedRow.toggle();
    }

    if (!row.close) {
      row.close = true;
    } else {
      row.close = false;
    }
    console.log(row);

    this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined;
  }
  disableScroll(row: any){
    this.disableParent2Scroll.emit(row);
}

enableScroll(row: any){
  this.enableParent2Scroll.emit(row);
}
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  // this is for closing the expanded row
  close?: boolean;
}

const data3: Element[] = [
  { position: 1, name: "Hydrogen3", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium3", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium3", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium3", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data3);
  }

  disconnect() {}
}

/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
