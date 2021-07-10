// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h, Prop, State, Watch, Listen } from '@stencil/core';
import { boardSuccess, cellLegal, getIndex, isInitialHint } from '../../../helpers/utils';

@Component({
  tag: 'lettuce-sudoku-board',
  styleUrl: 'lettuce-sudoku-board.css',
  shadow: true,
})
export class LettuceSudokuBoard {
  @Prop() order = 3;

  @Prop() initialBoard: string = JSON.stringify(new Array(this.order * this.order * this.order * this.order).fill(0));

  @Prop() currentBoard: string = JSON.stringify(JSON.parse(this.initialBoard));

  @State() initialState: number[] = JSON.parse(this.initialBoard);

  @State() currentState: number[] = JSON.parse(this.currentBoard);
  
  @Prop({mutable: true}) selectedRow: number;

  @Prop({mutable: true}) selectedCol: number;

  indexes = {
    3: {
      0: 0,
      1: 1,
      2: 2,
      3: null,
      4: 3,
      5: 4,
      6: 5,
      7: null,
      8: 6,
      9: 7,
      10: 8,
    },
    2: {
      0: 0, 
      1: 1,
      2: null,
      3: 2,
      4: 3,
    }
  }

  @Listen('cellSelected')
  onCellSelected(event: CustomEvent): void {
    const { row, col } = event.detail;
    this.selectedRow = row;
    this.selectedCol = col;
  }

  @Watch('currentBoard')
  onCurrentUpdate(): void {
    this.currentState = JSON.parse(this.currentBoard);
  }

  @Watch('initialBoard')
  onInitialUpdate(): void {
    this.initialState = JSON.parse(this.initialBoard);
    this.currentState = JSON.parse(this.initialBoard);
    this.selectedRow = -1;
    this.selectedCol = -1;
  }

  translateRow(index: number): number {
    return this.indexes[this.order][Math.floor(index / (this.order * this.order + this.order - 1))];
  }

  translateCol(index: number): number {
    return this.indexes[this.order][index % (this.order * this.order + this.order - 1)];
  }

  getRow(index: number): number {
    return Math.floor(index / (this.order * this.order));
  }

  getCol(index: number): number {
    return index % (this.order * this.order);
  }

  isSameBlock(row: number, col: number): boolean {
    const sameLane = Math.floor(this.selectedRow / this.order) === Math.floor(row / this.order);
    const sameTrunk = Math.floor(this.selectedCol / this.order) === Math.floor(col / this.order);
    return sameLane && sameTrunk;
  }

  isSameRow(row: number): boolean {
    return this.selectedRow === row;
  }

  isSameCol(col: number): boolean {
    return this.selectedCol === col;
  }

  isSameCell(row: number, col: number): boolean {
    return row === this.selectedRow && col === this.selectedCol;
  }

  isPeerCell(row: number, col: number): boolean {
    return (this.isSameRow(row) || this.isSameCol(col) || this.isSameBlock(row, col)) && !this.isSameCell(row, col);
  }

  isPeerDigit(row: number, col: number): boolean {
    const index = getIndex(row, col, this.order);
    const selectedIndex = getIndex(this.selectedRow, this.selectedCol, this.order);
    return this.currentState[index] === this.currentState[selectedIndex] && this.currentState[index] !== 0 && !this.isSameCell(row, col);
  }

  getCellStyling(row: number, col: number): string {
    const peerCell = this.isPeerCell(row, col);
    const selected = this.isSameCell(row, col);
    const peerDigit = this.isPeerDigit(row, col);
    const success = boardSuccess(this.currentState, this.order);
    const initial = isInitialHint(this.initialState, row, col, this.order);
    const valid = cellLegal(this.currentState, row, col, this.order);
    const none = this.currentState[getIndex(row, col, this.order)] === 0;
    let corner = '';
    if (row === 0 && col === 0) {
      corner = 'top-left';
    } else if (row == 0 && col === this.order * this.order - 1) {
      corner = 'top-right';
    } else if (row === this.order * this.order - 1 && col === this.order * this.order - 1) {
      corner = 'bottom-right';
    } else if (row === this.order * this.order -1 && col === 0) {
      corner = 'bottom-left';
    }
    const classString = `${selected ? 'selected' : ''} ${initial ? 'initial' : ''} ${valid ? 'valid' : 'invalid'} ${none ? 'none' : ''} ${success ? 'success' : ''} ${corner}`;
    if( this.selectedRow !== null && this.selectedCol !== null && this.selectedRow > -1 && this.selectedRow < this.order * this.order && this.selectedCol > -1 && this.selectedCol < this.order * this.order) {
      return `${classString} ${peerCell ? 'peer-cell' : ''} ${peerDigit ? 'peer-digit' : ''}`;
    }
    return classString;
  }

  render(): void {
    const tmpBoard = JSON.parse(JSON.stringify(this.currentState));
    let displayBoard = [];
    const numbers = [];

    for(let i = 0; i < this.order * this.order * this.order; i++) {
      numbers[i] = tmpBoard.splice(0, this.order);
    }
    for (let i = 0; i < this.order * this.order; i++) {
      for (let j = 0; j < this.order - 1; j++) {
        displayBoard = displayBoard.concat(numbers[i * this.order + j]);
        displayBoard.push(0);
      }
      displayBoard = displayBoard.concat(numbers[i * this.order + this.order - 1]);
      if (i % this.order === (this.order - 1) && i !== (this.order * this.order - 1)) {
        for (let j = 0; j < this.order * this.order + (this.order - 1); j++) {
          displayBoard.push(0);
        }
      }
    }
    displayBoard = displayBoard.reduce((accumulator, value) => accumulator.concat(value), []);
    return (
          <div class="border">
            <div class="content">
            <div class={`sudoku-board ${this.order === 3 ? 'three' : 'two'}`}>
                {displayBoard.map((num, index) => {
                  const row = this.translateRow(index);
                  const col = this.translateCol(index);
                  const bg = this.getCellStyling(row, col);
                  return row !== null && col !== null ? (
                      <lettuce-sudoku-cell 
                        number={num} 
                        row={row} 
                        col={col} 
                        selection-state={bg}
                      />
                    ) : <div />;
                  })
                }
            </div>
          </div>
        </div>
    );
  }

}
