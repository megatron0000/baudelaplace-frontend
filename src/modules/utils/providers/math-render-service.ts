import { Injectable } from '@angular/core'
import katex from 'katex'
import asciiToLatex from 'asciimath-to-latex'
import escape from 'escape-string-regexp'


/**
 * Used by `MathRenderComponent`. This service must not be exported from the containing module,
 * since it is a private service used by mentioned component.
 *
 * @export
 * @class MathRenderService
 */
@Injectable()
export class MathRenderService {
    constructor() { }


    /**
     * Envelops `incorrectMath` in red color via `span` elements
     *
     * @private
     * @param {string} incorrectMath
     * @returns {string}
     * @memberof MathRenderService
     */
    private genErrorAnnotation(incorrectMath: string): string {
        return '<span style="color: red">' + incorrectMath + '</span>'
    }

    /**
     * Parses math substrings, replacing them by Katex's html
     *
     * @param {string} math Text string inside which there are math substrings. Only these substrings will
     * be parsed as math. The rest will pass through intact
     * @param {string} [asciiSeparator='@@'] Separator for writing ascii math inside
     * (example: `@@ f(a,b)=a/b @@`)
     * @param {string} [latexSeparator='$$'] Separator for writing ascii math inside
     * (example: `$$ f(a,b)=\frac{a}{b} $$`)
     * @returns {string} Input string stripped of math delimiters and with math content
     * substituted for KATEX's html. If input string contained portions of incorrectly-sintaxed math,
     * such portions are enveloped in red color (via `span` elements)
     * @memberof MathRenderService
     */
    public render(math: string, asciiSeparator: string = '@@', latexSeparator: string = '$$'): string {
        let asciiRegexp = new RegExp(escape(asciiSeparator) + '(.*)?' + escape(asciiSeparator), 'g')
        let latexRegexp = new RegExp(escape(latexSeparator) + '(.*)?' + escape(latexSeparator), 'g')
        return math
            .replace(asciiRegexp, (substr, mathPart) => {
                try {
                    return katex.renderToString(asciiToLatex(mathPart))
                } catch (e) {
                    return this.genErrorAnnotation(mathPart)
                }
            })
            .replace(latexRegexp, (substr, mathPart) => {
                try {
                    return katex.renderToString(mathPart)
                } catch (e) {
                    return this.genErrorAnnotation(mathPart)
                }
            })
    }
}
