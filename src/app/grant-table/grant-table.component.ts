import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-grant-table',
  templateUrl: './grant-table.component.html',
  styleUrls: ['./grant-table.component.scss']
})
export class GrantTableComponent implements OnInit, AfterViewInit {

  constructor() { }

  tableWidth = 100;
  targetWidth = this.tableWidth;
  tableWidthSlider = this.tableWidth;
  zoomSpeed = 1;
  scrollSpeed = 1;

  targetScrollX = 0;

  scrollTable = false;

  zoomIntensity = 0.1;

  // config
  smooth = true;

  // grid
  @ViewChild('gridCanvas', {static: false}) gridCanvas!: ElementRef<HTMLCanvasElement>;
  gridCanvasContext!: CanvasRenderingContext2D;

  @ViewChild('canvasTable', {static: false}) canvasTable!: ElementRef;

  @HostListener('wheel', ['$event']) onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    if (this.smooth) {
      const nextValue = this.targetWidth - (event.deltaY * this.zoomIntensity);
      this.targetWidth = nextValue < 0 ? 0 : nextValue;
    } else {
      this.tableWidth = this.tableWidth - (event.deltaY * this.zoomIntensity);
    }
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    if (this.scrollTable) {
      if (this.smooth) {
        const nextScrollX = this.targetScrollX - event.movementX;
        this.targetScrollX = nextScrollX < 0 ? 0 : nextScrollX;
      } else {
        this.canvasTable.nativeElement.scrollLeft = this.canvasTable.nativeElement.scrollLeft - event.movementX;
      }
    }
  }

  ngOnInit(): void {
    interval(10).subscribe(() => {
      if (this.smooth) {
        this.tableZoom();
        this.tableScroll();
      }
      this.drawGrid();
    });
  }

  ngAfterViewInit(): void {
    this.gridCanvasContext = this.gridCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }

  drawGrid(): void {
    this.gridCanvasContext.clearRect(0, 0, 10000, 10000);
    this.gridCanvasContext.strokeStyle = 'black';
    this.gridCanvasContext.fillStyle = 'rgb(240, 90, 40)';
    this.gridCanvasContext.lineWidth = 1;

    this.gridCanvasContext.beginPath();
    // this.gridCanvasContext.rect(10, 10, 100, 100);
    for (let i = 0; i < 100; i++) {
      const nextX = this.tableWidth * (i / 10);
      this.gridCanvasContext.moveTo(nextX, 0);
      this.gridCanvasContext.lineTo(nextX, 800);
    }
    this.gridCanvasContext.stroke();
  }

  tableZoom(): void {
    if (this.tableWidth !== this.targetWidth) {
      const additive = this.tableWidth < this.targetWidth;
      const nextZoomSpeed = Math.abs((this.tableWidth - this.targetWidth)) / 10;

      this.zoomSpeed = nextZoomSpeed < 1 ? 1 : nextZoomSpeed;
      const nextValue = additive ? this.tableWidth + this.zoomSpeed : this.tableWidth - this.zoomSpeed;
      this.tableWidth = Math.round(nextValue);
    }
  }

  tableScroll(): void {
    if (this.canvasTable.nativeElement.scrollLeft !== this.targetScrollX) {

      const additive = this.canvasTable.nativeElement.scrollLeft < this.targetScrollX;
      const nextScrollSpeed = Math.abs((this.canvasTable.nativeElement.scrollLeft - this.targetScrollX)) / 5;

      this.scrollSpeed = nextScrollSpeed < 1 ? 1 : nextScrollSpeed;
      const nextValue = additive ? this.canvasTable.nativeElement.scrollLeft + this.scrollSpeed : this.canvasTable.nativeElement.scrollLeft - this.scrollSpeed;
      this.canvasTable.nativeElement.scrollLeft = Math.round(nextValue);
    }
  }

  onScrollTable(mouseHeld: boolean): void {
    this.scrollTable = mouseHeld;
  }

  onSlide(event: any): void {
    this.targetWidth = event.value;
  }

}
