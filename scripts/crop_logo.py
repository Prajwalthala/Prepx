import zlib
import struct

def process_logo(input_path, output_path):
    with open(input_path, 'rb') as f:
        data = f.read()

    idx = 8
    idat_chunks = []
    width = height = None
    color_type = None

    while idx < len(data):
        length = struct.unpack('>I', data[idx:idx+4])[0]
        chunk_type = data[idx+4:idx+8]
        chunk_data = data[idx+8:idx+8+length]
        idx += 8 + length + 4

        if chunk_type == b'IHDR':
            width, height, bit_depth, color_type = struct.unpack('>IIBB', chunk_data[:10])
        elif chunk_type == b'IDAT':
            idat_chunks.append(chunk_data)
        elif chunk_type == b'IEND':
            break

    decompressed = zlib.decompress(b''.join(idat_chunks))
    bpp = 4 if color_type == 6 else 3
    stride = width * bpp
    raw_rows = []
    offset = 0
    prev_row = bytearray(stride)

    for y in range(height):
        filter_type = decompressed[offset]
        offset += 1
        curr_row = bytearray(decompressed[offset:offset+stride])
        offset += stride
        if filter_type == 1:
            for i in range(bpp, stride):
                curr_row[i] = (curr_row[i] + curr_row[i - bpp]) & 0xFF
        elif filter_type == 2:
            for i in range(stride):
                curr_row[i] = (curr_row[i] + prev_row[i]) & 0xFF
        elif filter_type == 3:
            for i in range(stride):
                left = curr_row[i - bpp] if i >= bpp else 0
                up = prev_row[i]
                curr_row[i] = (curr_row[i] + ((left + up) >> 1)) & 0xFF
        elif filter_type == 4:
            for i in range(stride):
                left = curr_row[i - bpp] if i >= bpp else 0
                up = prev_row[i]
                c = prev_row[i - bpp] if i >= bpp else 0
                p = left + up - c
                pa = abs(p - left)
                pb = abs(p - up)
                pc = abs(p - c)
                if pa <= pb and pa <= pc: pr = left
                elif pb <= pc: pr = up
                else: pr = c
                curr_row[i] = (curr_row[i] + pr) & 0xFF
        prev_row = curr_row
        raw_rows.append(curr_row)

    min_x, max_x = width, 0
    min_y, max_y = height, 0
    for y in range(height):
        row = raw_rows[y]
        for x in range(width):
            r, g, b = row[x*bpp], row[x*bpp+1], row[x*bpp+2]
            if r < 240 or g < 240 or b < 240:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y

    pad = 8
    min_x = max(0, min_x - pad)
    min_y = max(0, min_y - pad)
    max_x = min(width - 1, max_x + pad)
    max_y = min(height - 1, max_y + pad)

    crop_w = max_x - min_x + 1
    crop_h = max_y - min_y + 1
    print(f"Bounding box: {min_x}, {min_y}, {max_x}, {max_y} ({crop_w}x{crop_h})")

    # Build new RGBA image with transparent background where pixels are white/near-white
    new_raw = bytearray()
    for y in range(min_y, max_y + 1):
        new_raw.append(0) # filter type None
        row = raw_rows[y]
        for x in range(min_x, max_x + 1):
            r, g, b = row[x*bpp], row[x*bpp+1], row[x*bpp+2]
            if r > 245 and g > 245 and b > 245:
                # transparent
                new_raw.extend([255, 255, 255, 0])
            else:
                new_raw.extend([r, g, b, 255])

    compressed = zlib.compress(bytes(new_raw), 9)

    def make_chunk(chunk_type, chunk_data):
        length = struct.pack('>I', len(chunk_data))
        crc = struct.pack('>I', zlib.crc32(chunk_type + chunk_data) & 0xFFFFFFFF)
        return length + chunk_type + chunk_data + crc

    out_bytes = bytearray(b'\x89PNG\r\n\x1a\n')
    ihdr_data = struct.pack('>IIBBBBB', crop_w, crop_h, 8, 6, 0, 0, 0)
    out_bytes.extend(make_chunk(b'IHDR', ihdr_data))
    out_bytes.extend(make_chunk(b'IDAT', compressed))
    out_bytes.extend(make_chunk(b'IEND', b''))

    with open(output_path, 'wb') as f:
        f.write(out_bytes)
    print(f"Saved cropped transparent logo to {output_path}")

process_logo('/Users/apple/coding/PrepX/prepx/public/logo.png', '/Users/apple/coding/PrepX/prepx/public/logo-clean.png')
