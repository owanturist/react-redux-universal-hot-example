import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

export default ({ assets: { styles, javascript }, component, store }) => (
    <html lang="ru">
        <head>
            {DocumentMeta.renderAsReact()}

            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />

            {Object.keys(styles).map((style, key, arr) =>
                <link href={arr[style]} {...{ key }} rel="stylesheet" />
            )}
        </head>
        <body>
            <main id="root" dangerouslySetInnerHTML={{ __html: component ? renderToString(component) : '' }} />
            <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} />
            <script src={javascript.main} />
        </body>
    </html>
);
