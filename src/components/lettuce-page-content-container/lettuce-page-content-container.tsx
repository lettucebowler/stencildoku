// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h } from '@stencil/core';

@Component({
  tag: 'lettuce-page-content-container',
  styleUrl: 'lettuce-page-content-container.css',
  shadow: true,
})
export class LettucePageContentContainer {

  render(): void {
    return (
      <div class="center">
        <div class="column">
          <slot></slot>
        </div>
      </div>
    );
  }

}
