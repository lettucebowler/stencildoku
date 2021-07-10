// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Listen, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { modalController } from '@ionic/core';
import { getIndex } from '../../../helpers/utils';
import  SudokuToolCollection  from 'sudokutoolcollection';

@Component({
  tag: 'lettuce-sudoku-game',
  styleUrl: 'lettuce-sudoku-game.css',
  shadow: true,
})
export class LettuceSudokuGame {

  @Prop() order = 3;

  @State() initialBoard: number[] =  Array(this.order * this.order * this.order * this.order).fill(0)

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
  async openModal() {
    const modal: HTMLIonModalElement =
                 await modalController.create({
      component: 'lettuce-modal',
      backdropDismiss: false
    });

    await modal.present();
  }

  @Listen('generateBoard', {target: 'document'})
  async generateBoard(event: CustomEvent) {
    const modal: HTMLIonModalElement =
      await modalController.create({
        component: 'lettuce-modal',
        backdropDismiss: false
      });

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
    await modal.dismiss();
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
          <div>
            <lettuce-spacing-vertical size-selection="xxs" />
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
