// read more into chapter: The Instruction Cycle - Fetch, Decode, Execute - https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/

class CPU 
{
    memory: Uint8Array; //this is 4kb RAM, all values can end up to 255, so for example, memory[0] = 300 would result in memory[0] === 255.
    programCounter: number; //this stores the address of the current instruction as an 16-bit integer.
    registers: Uint8Array; //registers exist as a kind of "short-term memory.
    index: number; //the index register exists mostly for reading and writing to memory in general.
    stack: Uint16Array; //chip-8 has the ability to go into subroutines, and a stack for keeping track of where to return to.
    stackPointer: number; //the stack pointer points to a location in the stack.

    delayTimer: number;
    soundTimer: number;

    constructor() 
    {
        //setting up the array with the correct values.
        this.memory = new Uint8Array(4096);
        this.registers = new Uint8Array(16);
        this.stack = new Uint16Array(16);

        //setting the correct values for the navigators and guides.
        this.soundTimer = 0;
        this.delayTimer = 0;
        this.index = 0;
        this.stackPointer = -1;
        this.programCounter = 0x200; //Chip-8 has memory reserved and starts at 0x200.
    }
}