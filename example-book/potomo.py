import sys
from babel.messages.pofile import read_po
from babel.messages.mofile import write_mo

def compile_po_to_mo(po_file, mo_file):
    print("here ", po_file)
    with open(po_file, 'rb') as f:
        po = read_po(f)
    print("2nd")
    with open(mo_file, 'w+b') as f:
        write_mo(f, po)
    print("last")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python compile_po_to_mo.py <po_file> <mo_file>")
        sys.exit(1)

    po_file = sys.argv[1]
    mo_file = sys.argv[2]

    print("[Translator3000] Compiling PO file to MO file... " + po_file + " -> " + mo_file)

    compile_po_to_mo(po_file, mo_file)