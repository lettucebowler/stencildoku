// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lettuce-sudoku-cell',
  styleUrl: 'lettuce-sudoku-cell.css',
  shadow: true,
})
export class LettuceSudokuCell {

  @Prop() number = 0;

  @Prop() row: number;

  @Prop() col: number;

  @Prop() selectionState = '';

  @Prop() numberStatus = 'none';

  @Prop() type = '';

  @Event() cellSelected: EventEmitter;

  emitSelection(): void {
    this.cellSelected.emit({row: this.row, col: this.col});
  }

  render(): void {
    return (
      <button class={`number ${this.type} ${this.selectionState}`} onClick={() => this.emitSelection()}>
        {this.number}
      </button>
    );
  }

}
