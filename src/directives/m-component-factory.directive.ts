import {
    Input,
    Directive,
    OnChanges,
    OnDestroy,
    ComponentRef,
    ComponentFactory,
    Compiler,
    ComponentFactoryResolver,
    ViewContainerRef,
    Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * 根据组件名称动态加载组件
 * @Input() component:组件名称
 */
@Directive({
    selector: '[m-component-factory]'
})
export class ComponentFactoryDirective implements OnChanges, OnDestroy {
    @Input() component: string;
    componentRef: ComponentRef<any>;
    init: boolean = false;
    constructor(
        private containerRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
    ) { }

    ngOnChanges() {
        if (!this.component || this.init) return;

        var factories = Array.from(this.resolver['_factories'].keys());
        var factoryClass = <Type<any>>factories.find((x: any) => x.name === this.component);
        const factory = this.resolver.resolveComponentFactory(factoryClass);
        const compRef = this.containerRef.createComponent(factory);

        if (this.componentRef) {
            this.componentRef.destroy();
        }

        this.componentRef = compRef;
        this.init = true;
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

}