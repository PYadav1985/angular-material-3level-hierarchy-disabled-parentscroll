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
  selector: "level2",
  styleUrls: ["level2.css"],
  templateUrl: "level2.html",
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
export class Level2 {
  @ViewChild("pager2") paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() singleChildRowDetail: boolean;
  @Input()
  set currentPosition(val: TableContext) {
    this.dataSource2.data = data2;//.filter(x => x.position === val.Id);
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort;
  }
  @Output() disableParentScroll = new EventEmitter<any>();
  @Output() enableParentScroll = new EventEmitter<any>();
  
  get() {
    //return this.l2Pos;
  }

  isExpansionDetailRow = (index, row) => row.hasOwnProperty("detailRow");
  displayedColumns2 = ["expandCollapse", "position", "name", "weight"];
  dataSource2 = new MatTableDataSource();
  levelThreeTableContext: TableContext = { Id: null };

  constructor(private factory: ComponentFactoryResolver) {}

  ngOnInit() {}

  private openedRow: CdkDetailRowDirective;
  parent2Scroll: string;
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

    this.levelThreeTableContext.Id = row.position;

    this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined;
  }
  disableScroll(row: any){
    this.disableParentScroll.emit(row);
}

enableScroll(row: any){
  this.enableParentScroll.emit(row);
}
disableParent2Scroll(row: any){
    this.parent2Scroll = 'hidden';
  }
  
  enableParent2Scroll(row: any){
    this.parent2Scroll = 'auto';
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

const data2: Element[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
  { position: 11, name: "Sodium", weight: 22.9897, symbol: "Na" },
  { position: 12, name: "Magnesium", weight: 24.305, symbol: "Mg" },
  { position: 13, name: "Aluminum", weight: 26.9815, symbol: "Al" },
  { position: 14, name: "Silicon", weight: 28.0855, symbol: "Si" },
  { position: 15, name: "Phosphorus", weight: 30.9738, symbol: "P" },
  { position: 16, name: "Sulfur", weight: 32.065, symbol: "S" },
  { position: 17, name: "Chlorine", weight: 35.453, symbol: "Cl" },
  { position: 18, name: "Argon", weight: 39.948, symbol: "Ar" },
  { position: 19, name: "Potassium", weight: 39.0983, symbol: "K" },
  { position: 20, name: "Calcium", weight: 40.078, symbol: "Ca" }
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
    return Observable.of(data2);
  }

  disconnect() {}
}

/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
