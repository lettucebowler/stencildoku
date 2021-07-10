// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Listen, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { getIndex } from '../../../helpers/utils';
import  SudokuToolCollection  from 'sudokutoolcollection';

@Component({
  tag: 'lettuce-sudoku-game',
  styleUrl: 'lettuce-sudoku-game.css',
  shadow: true,
})
export class LettuceSudokuGame {

  @Prop() order = 3;

  @State() initialBoard: number[] =  this.order === 3 
    ? [0, 0, 0, 8, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0]
    : [0, 3, 4, 0, 4, 0, 0, 2, 1, 0, 0, 3, 0, 2, 1, 0];

  @State() currentBoard: number[] = JSON.parse(JSON.stringify(this.initialBoard));

  @State() selectedRow: number = null;

  @State() selectedCol: number = null;

  @Event() newGameEvent: EventEmitter;

  @Event({bubbles: true, composed: true}) moveEvent: EventEmitter;

  @Listen('keydown', { target: 'document' })
  onKeyDown(event: KeyboardEvent): void {
    this.updateBoard(parseInt(event.key), this.selectedRow, this.selectedCol);
  }

  @Listen('cellSelected')
  onCellSelected(event: CustomEvent): void {
    event.stopPropagation();
    const {row, col} = event.detail;
    this.selectedRow = row;
    this.selectedCol = col;
  }

  @Listen('newGameEvent')
  onNewGame(event: CustomEvent): void {
    event.stopPropagation();
    if (this.order === 3) {
      const hints = event.detail || 17;
      const board = SudokuToolCollection().generator.generate(hints);
      const boardString = board.split('');
      const numArray = [];
      boardString.map((c: string) => {
        numArray.push(parseInt(c) || 0);
      });
      this.initialBoard = JSON.parse(JSON.stringify(numArray));
      this.currentBoard = JSON.parse(JSON.stringify(numArray));
    }
  }

  @Listen('moveEvent')
  onMoveEvent(event: CustomEvent): void {
    event.stopImmediatePropagation();
    const { num } = event.detail;
    this.updateBoard(num, this.selectedRow, this.selectedCol);
  }

  componentWillLoad(): void {
    this.newGameEvent.emit(30);
  }

  updateBoard(num: number, row: number, col: number): void {
    console.log(num);
    if (!isNaN(num) && num >= 0 && num <= this.order * this.order) {
      const spot = getIndex(row, col, this.order);
      const before = this.currentBoard.slice(0, spot);
      const after = this.currentBoard.slice(spot + 1);
      this.currentBoard = [
        ...before,
        num,
        ...after
      ];
    }
  }

  render(): void {
    return (
      <lettuce-page-content-container>
        <div class="sudoku-game">
          <div>
            <lettuce-spacing-vertical size-selection="xxs" />
            <lettuce-sudoku-board 
              order={this.order} 
              initial-board={JSON.stringify(this.initialBoard)}
              current-board={JSON.stringify(this.currentBoard)}
            />
          </div>
          {/* <lettuce-sudoku-button-group order={this.order}></lettuce-sudoku-button-group> */}
          <div>
            <lettuce-spacing-vertical size-selection="xxs" />
            {/* <div class="move-buttons">
              {Array.from({length: this.order * this.order + 1}, (_, i) => i + 1).map((num) => 
                <lettuce-button 
                  square 
                  text={(num % (this.order * this.order + 1)).toString()} 
                  size-selection="lg" 
                  onClick={() => this.moveEvent.emit({num: num % (this.order * this.order + 1)})} 
                />
              )}
            </div> */}
            <lettuce-sudoku-move-buttons order={this.order} />
          </div>
          <div class="bottom-row" style={{ display: 'flex', flexDirection: 'column' }}>
            <lettuce-spacing-vertical size-selection="xxs" />
            <lettuce-button text="New game" new-game fluid size-selection="lg" onClick={() => this.newGameEvent.emit()} />
            <lettuce-spacing-vertical size-selection="xxs" />
          </div>
        </div>
      </lettuce-page-content-container>
    );
  }
}
