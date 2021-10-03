// List of instructions: http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#3.1
//
// for each 36 instructions, each instruction has a unique identifier, mask, pattern, and arguments.
// with all these instructions, each opcode can be disassembled into a unique identifier, and the values of the arguments can be determined. 
// The instructions array contains all these instructions and a disassembler.

// each comment above each instruction is: id - name
const instructions = [
{
    //CLS
    key: 2,
    mask: 0xffff,
    pattern: 0x00e0,
    arguments: [],
},
{
    //RET
    key: 3,
    mask: 0xffff,
    pattern: 0x00ee,
    arguments: [],
},
{
    //JP_ADDR - JP
    key: 4,
    mask: 0xf000,
    pattern: 0x1000,
    arguments: [{ mask: 0x0fff, shift: 0, type: 'A' }],
},
{
    //CALL_ADDR - CALL
    key: 5,
    mask: 0xf000,
    pattern: 0x2000,
    arguments: [{ mask: 0x0fff, shift: 0, type: 'A' }],
},
{
    //SE_VX_NN - SE
    key: 6,
    mask: 0xf000,
    pattern: 0x3000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
},
{
    //SNE_VX_NN - SNE
    key: 7,
    mask: 0xf000,
    pattern: 0x4000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
},
{
    //SE_VX_VY - SE
    key: 8,
    mask: 0xf00f,
    pattern: 0x5000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //LD_VX_NN - LD
    key: 9,
    mask: 0xf000,
    pattern: 0x6000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
},
{
    //ADD_VX_NN - ADD
    key: 10,
    mask: 0xf000,
    pattern: 0x7000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
},
{
    //LD_VX_VY - LD
    key: 11,
    mask: 0xf00f,
    pattern: 0x8000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //OR_VX_VY - OR
    key: 12,
    mask: 0xf00f,
    pattern: 0x8001,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //AND_VX_VY - AND
    key: 13,
    mask: 0xf00f,
    pattern: 0x8002,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //XOR_VX_VY - XOR
    key: 14,
    mask: 0xf00f,
    pattern: 0x8003,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //ADD_VX_VY - ADD
    key: 15,
    mask: 0xf00f,
    pattern: 0x8004,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //SUB_VX_VY - SUB
    key: 16,
    mask: 0xf00f,
    pattern: 0x8005,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //SHR_VX_VY - SHR
    key: 17,
    mask: 0xf00f,
    pattern: 0x8006,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //SUBN_VX_VY - SUBN
    key: 18,
    mask: 0xf00f,
    pattern: 0x8007,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //SHL_VX_VY - SHL
    key: 19,
    mask: 0xf00f,
    pattern: 0x800e,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //SNE_VX_VY - SNE
    key: 20,
    mask: 0xf00f,
    pattern: 0x9000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
},
{
    //LD_I_ADDR - LD
    key: 21,
    mask: 0xf000,
    pattern: 0xa000,
    arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0fff, shift: 0, type: 'A' }],
},
{
    //JP_V0_ADDR - JP
    key: 22,
    mask: 0xf000,
    pattern: 0xb000,
    arguments: [{ mask: 0x0000, shift: 0, type: 'V0' }, { mask: 0x0fff, shift: 0, type: 'A' }],
},
{
    //RND_VX_NN - RND
    key: 23,
    mask: 0xf000,
    pattern: 0xc000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
},
{
    //DRW_VX_VY_N - DRW
    key: 24,
    mask: 0xf000,
    pattern: 0xd000,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }, { mask: 0x000f, shift: 0, type: 'N' }],
},
{
    //SKP_VX - SKP
    key: 25,
    mask: 0xf0ff,
    pattern: 0xe09e,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }],
},
{
    //SKNP_VX - SKNP
    key: 26,
    mask: 0xf0ff,
    pattern: 0xe0a1,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }],
},
{
    //LD_VX_DT - LD
    key: 27,
    mask: 0xf00f,
    pattern: 0xf007,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: 'DT' }],
},
{
    //LD_VX_N - LD
    key: 28,
    mask: 0xf00f,
    pattern: 0xf00a,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: 'K' }],
},
{
    //LD_DT_VX - LD
    key: 29,
    mask: 0xf0ff,
    pattern: 0xf015,
    arguments: [{ mask: 0x0000, shift: 0, type: 'DT' }, { mask: 0x0f00, shift: 8, type: 'R' }],
},
{
    //LD_ST_VX - LD
    key: 30,
    mask: 0xf0ff,
    pattern: 0xf018,
    arguments: [{ mask: 0x0000, shift: 0, type: 'ST' }, { mask: 0x0f00, shift: 8, type: 'R' }],
},
{
    //ADD_I_VX - ADD
    key: 31,
    mask: 0xf0ff,
    pattern: 0xf01e,
    arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0f00, shift: 8, type: 'R' }],
},
{
    //LD_F_VX - LD
    key: 32,
    mask: 0xf0ff,
    pattern: 0xf029,
    arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0f00, shift: 8, type: 'R' }],
},
{
    //LD_B_VX - LD
    key: 33,
    mask: 0xf0ff,
    pattern: 0xf033,
    arguments: [{ mask: 0x0000, shift: 0, type: 'B' }, { mask: 0x0f00, shift: 8, type: 'R' }],
},
{
    //LD_I_VX - LD
    key: 34,
    mask: 0xf0ff,
    pattern: 0xf055,
    arguments: [{ mask: 0x0000, shift: 0, type: '[I]' }, { mask: 0x0f00, shift: 8, type: 'R' }],
},
{
    //LD_VX_I - LD
    key: 35,
    mask: 0xf0ff,
    pattern: 0xf065,
    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: '[I]' }],
},
{
    //DW
    key: 36,
    mask: 0x0000,
    pattern: 0x0000,
    arguments: [{ mask: 0xffff, shift: 0, type: 'DW' }],
},
]
    module.exports = {
    instructions,
}
