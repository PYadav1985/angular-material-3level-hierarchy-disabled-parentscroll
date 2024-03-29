// Done: all child grid are reflecting the same instance. due to that, if you open first row and then second row, they have same child grid instead, it should have related record only.
// Done: create separate component for level 2 and 3, also check that, will it work when multiple level expanded?
// Done: paging is not working on child grids so try moving same to child component and try again
// Done: Fixed the height of child grid and show scroll as alternate
// Done: Load data dynamically when expand
// Done:  expand-collpase icon reflect in all grid at the same time. this may be resolve with separate component
// Done: Collapse other rows when expand any

import {
  Component,
  Input,
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

import { Level2 } from "./app-level2/level2";

import { TableContext } from "table-context";

/**
 * @title Basic table
 */
@Component({
  selector: "table-basic-example",
  styleUrls: ["table-basic-example.css"],
  templateUrl: "table-basic-example.html",
})
export class TableBasicExample {
  @ViewChild("pager") paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("tpl", { read: ViewContainerRef }) vc: ViewContainerRef;

  @Input() singleChildRowDetail: boolean;

  levelTwoTableContext: TableContext = { Id: null };
  isExpansionDetailRow = (index, row) => row.hasOwnProperty("detailRow");
  displayedColumns = ["expandCollapse", "position", "name", "weight"];
  dataSource = new MatTableDataSource();

  constructor(private factory: ComponentFactoryResolver) {}

  ngOnInit() {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private openedRow: CdkDetailRowDirective;
  parentScroll: string;
  onToggleChange(cdkDetailRow: CdkDetailRowDirective, row): void {
    debugger;
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
    this.levelTwoTableContext.Id = row.position;
    this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined;
    if(cdkDetailRow.expended){
      
    }
  }

  disableParentScroll(row: any){
    this.parentScroll = 'hidden';
  }
  
  enableParentScroll(row: any){
    this.parentScroll = 'auto';
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

const data: Element[] = [
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
    return Observable.of(data);
  }

  disconnect() {}
}

/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
