import { expect } from 'chai';
import { formatUrl } from 'api/request';
import { apiHost, apiPort } from 'config';

describe('api', () => {
    describe('formatUrl', () => {
        it('client', () => {
            expect(formatUrl(undefined, false)).to.equal(`/api/`);
        });

        it('server', () => {
            expect(formatUrl(undefined, true)).to.equal(`http://${apiHost}:${apiPort}/`);
        });

        it('without \'/\'', () => {
            expect(formatUrl('path', false)).to.equal(`/api/path`);
        });

        it('singel \'/\'', () => {
            expect(formatUrl('/path', false)).to.equal(`/api/path`);
        });

        it('more than one \'/\'', () => {
            expect(formatUrl('///path', false)).to.equal(`/api/path`);
        });

        it('\'/\' not at the start', () => {
            expect(formatUrl('path/to', false)).to.equal(`/api/path/to`);
        });
    });
});
