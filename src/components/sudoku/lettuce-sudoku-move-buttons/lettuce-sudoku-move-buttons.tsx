import { Component, Event, h, Prop, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lettuce-sudoku-move-buttons',
  styleUrl: 'lettuce-sudoku-move-buttons.css',
  shadow: true,
})
export class LettuceSudokuMoveButtons {

  @Prop() order = 3;

  @Event() moveEvent: EventEmitter;

  render() {
    return (
      <div class="move-buttons">
        {Array.from({length: this.order * this.order + 1}, (_, i) => i + 1).map((num) => 
          <lettuce-button 
            square 
            text={(num % (this.order * this.order + 1)).toString()} 
            size-selection="lg" 
            onClick={() => this.moveEvent.emit({num: num % (this.order * this.order + 1)})} 
          />
        )}
      </div>
    );
  }

}
