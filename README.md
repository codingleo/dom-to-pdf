# dom-to-pdf

dom-to-pdf generates a printable PDF from DOM node using HTML5 canvas and svg.

## Install

```bash
npm install --save dom-to-pdf-magic
```

## Usage

### CommonJS
```javascript
const { domToPdf } = require('dom-to-pdf-magic');

const element = document.getElementById('test');
const options = {
  filename: 'test.pdf'
};

// Using callback
domToPdf(element, options, function(pdf) {
  console.log('PDF generated!');
});

// Using promises
domToPdf(element, options)
  .then(result => {
    console.log('PDF generated!');
  })
  .catch(error => {
    console.error('Error generating PDF:', error);
  });
```

### ES Modules
```javascript
import { domToPdf } from 'dom-to-pdf-magic';

const element = document.getElementById('test');
const options = {
  filename: 'test.pdf'
};

// Using async/await
async function generatePdf() {
  try {
    const result = await domToPdf(element, options);
    console.log('PDF generated!');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

generatePdf();
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `filename` | string | 'generated.pdf' | Name of resulted PDF file |
| `excludeClassNames` | string[] | [] | List of class names of elements to exclude from PDF |
| `excludeTagNames` | string[] | ['button', 'input', 'select'] | List of html tags to exclude from PDF |
| `overrideWidth` | number | - | Overrides a width of a container DOM element |
| `proxyUrl` | string | - | A route in your app which renders images on your domain to avoid CORS issues |
| `compression` | string | 'NONE' | Compression of the generated image, can have the values 'NONE', 'FAST', 'MEDIUM' and 'SLOW' |
| `scale` | number | - | Increases an image's size before exporting to improve the image quality |
| `output` | string | 'pdf' | Output format: 'pdf' (triggers download), 'blob', or 'base64' |

## Advanced Usage

### Custom Element Filtering

```javascript
import { domToPdf } from 'dom-to-pdf-magic';

// Exclude all buttons and inputs, plus elements with class 'no-print'
const options = {
  filename: 'report.pdf',
  excludeTagNames: ['button', 'input', 'select'],
  excludeClassNames: ['no-print', 'hidden-print']
};

domToPdf(document.getElementById('content'), options);
```

### High Quality Output

```javascript
import { domToPdf } from 'dom-to-pdf-magic';

// Generate a high-quality PDF with better compression
const options = {
  filename: 'high-quality.pdf',
  scale: 2, // Double the resolution
  compression: 'MEDIUM' // Better compression
};

domToPdf(document.getElementById('content'), options);
```

### Getting PDF as Blob for Further Processing

```javascript
import { domToPdf } from 'dom-to-pdf-magic';

// Get PDF as Blob for upload to server
const options = {
  output: 'blob'
};

domToPdf(document.getElementById('content'), options)
  .then(pdfBlob => {
    // Upload to server
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'document.pdf');
    
    fetch('/upload', {
      method: 'POST',
      body: formData
    });
  });
```

## TypeScript Support

This library includes TypeScript definitions out of the box:

```typescript
import { domToPdf, DomToPdfOptions } from 'dom-to-pdf-magic';

const options: DomToPdfOptions = {
  filename: 'report.pdf',
  excludeClassNames: ['hidden'],
  output: 'blob'
};

domToPdf(document.getElementById('content')!, options)
  .then(result => {
    console.log('Done!');
  });
```

## Support
<a href='https://ko-fi.com/Y8Y5ZDQP' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi4.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

Support me with a coin

BTC 14VroJFPkqKPUSafverhgsZJyqrzYXm3zn

<a href='https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=N4989JZU4MV6Y&item_name=Support&currency_code=USD&source=url' target='_blank'>Paypal</a>

<a href='https://money.yandex.ru/to/410012447478695' target='_blank'>Yandex Money</a>

## MIT License
Copyright (c) 2025 Leonardo Ribeiro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.