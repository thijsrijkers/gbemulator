// you can imagine the Chip8 CPU to be a virtual console, and a Chip-8 ROM to be a virtual game cartridge.
// the ROM buffer will take the raw binary file and translate it into 16-bit big endian words (a word is a unit of data consisting of a set amount of bits).

class RomBuffer 
{
    data: any;

    constructor(contents: any) 
    {
        this.data = [];
        const buffer = contents;

        // create opcodes from the buffer
        for (let i = 0; i < buffer.length; i += 2) 
        {
            this.data.push((buffer[i] << 8) | (buffer[i + 1] << 0))
        }
    }
}