import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'lettuce-modal',
  styleUrl: 'lettuce-modal.css',
  shadow: true,
})
export class LettuceModal {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
