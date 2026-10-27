import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  failed: boolean;
}

export class WebGLBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_62%)]"
          aria-hidden="true"
        />
      );
    }
    return this.props.children;
  }
}
