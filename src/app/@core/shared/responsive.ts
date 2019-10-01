import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export class ResponsiveD3 {

  responsivefy(svg: any) {
    // get container + svg aspect ratio
    const container = d3.select(svg.node().parentNode);
    const width = +svg.style('width');
    const height = +svg.style('height');
    const aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('perserveAspectRatio', 'xMinYMid')
      .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on('resize.' + container.attr('id'), resize);

    // get width of container and resize svg to fit it
    function resize() {
    const targetWidth = +container.style('width');
    svg.attr('width', targetWidth);
    svg.attr('height', Math.round(targetWidth / aspect));
    }
  }
}
