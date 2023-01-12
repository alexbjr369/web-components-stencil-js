import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo = false;
  @Prop({ reflect: true }) title: string;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;

    if (this.showContactInfo) {
      mainContent = (
        <div id="contact">
          <h2>Contact Information</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <ul>
            <li>Lorem, ipsum.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum.</li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>x</button>
        </header>
        <section id="tabs">
          <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>
            Navigation
          </button>
          <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'contact')}>
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>,
    ];
  }
}
