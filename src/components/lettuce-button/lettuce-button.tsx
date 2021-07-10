// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'lettuce-button',
  styleUrl: 'lettuce-button.css',
  shadow: true,
})

export class LettuceButton {
  @Prop() text: string;

  @Prop() type = 'primary';

  @Prop() fluid = false;

  @Prop() sizeSelection: string | 'sm' | 'md' | 'lg'  = 'md';

  @Prop() square = false;

  @Prop() newGame = false;

  render(): void {
    return (
      <button type="button" class={`btn ${this.square ? 'square' : ''} ${this.newGame ? 'new-game' : ''} ${this.type} ${this.fluid ? 'fluid' : null} txt-${this.sizeSelection}`}>
        {this.text}
        <slot />
      </button>
    );
  }
}
