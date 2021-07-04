import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { EditorialModel } from "src/app/models/editorial.model";
import { EditorialService } from "src/app/services/editorial.service";
import { CONSTANTS } from "src/app/shared/constants";
import { OkCancelDialogComponent } from "src/app/shared/ok-cancel-dialog/ok-cancel-dialog.component";
import { AddEditorialDialogComponent } from "./add-editorial-dialog/add-editorial-dialog.component";

@Component({
  selector: "app-editorial",
  templateUrl: "./editorial.component.html",
  styleUrls: ["./editorial.component.css"],
})
export class EditorialComponent implements OnInit {
  displayedColumns: string[] = [
    "nombre",
    "direccionCorrespondencia",
    "telefono",
    "correo",
    "maxLibroRegistrado",
    "actions",
  ];
  dataSource: MatTableDataSource<EditorialModel> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private editorialService: EditorialService
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.consultar();
  }

  consultar() {
    this.spinnerService.show();
    this.editorialService.select().subscribe(
      (result) => {
        this.spinnerService.hide();
        this.dataSource.data = result;
      },
      (error) => {
        this.spinnerService.hide();
        this.toastr.error("Error consultando datos.");
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdd() {
    const dialog = this.dialog.open(AddEditorialDialogComponent, {
      width: "350px",
      height: "auto",
      data: {
        mode: CONSTANTS.DETAIL_PAGE.MODE.ADD,
        data: new EditorialModel(),
      },
    });

    dialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.consultar();
      }
    });
  }

  onEdit(row: EditorialModel) {
    const dialog = this.dialog.open(AddEditorialDialogComponent, {
      width: "300px",
      height: "auto",
      data: { mode: CONSTANTS.DETAIL_PAGE.MODE.EDIT, data: row },
    });

    dialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.consultar();
      }
    });
  }

  onDelete(row: EditorialModel) {
    const dialogRef = this.dialog.open(OkCancelDialogComponent, {
      width: "400px",
      height: "130px",
      data: {
        message: "¿Seguro desea eliminar la editorial?",
        buttonMode: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.consultar();
      }
    });
  }
}