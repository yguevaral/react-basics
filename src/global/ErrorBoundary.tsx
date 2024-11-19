/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props)
      this.state = { hasError: false }
    }
  
    static getDerivedStateFromError(error: any) {
        console.log(error)
      return { hasError: true }
    }
  
    componentDidCatch(error: any, errorInfo: any) {
      console.log(error, errorInfo)
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Error Boundary Detectado</h1>
      }
  
      return this.props.children
    }
  }