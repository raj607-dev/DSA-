class Pair {
    String first;
    String second;

    Pair(String first, String second) {
        this.first = first;
        this.second = second;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pair)) return false;
        Pair p = (Pair) o;
        return first.equals(p.first) && second.equals(p.second);
    }

    @Override
    public int hashCode() {
        return first.hashCode() * 31 + second.hashCode();
    }
}
