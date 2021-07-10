// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'lettuce-spacing-vertical',
  styleUrl: 'lettuce-spacing-vertical.css',
  shadow: true,
})
export class LettuceSpacingVertical {
  @Prop() sizeSelection = 'md';

  render(): void {
    return (
      <div class={`vertical-${this.sizeSelection}`} />
    );
  }

}
