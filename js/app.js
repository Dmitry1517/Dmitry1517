const App = {
  data: () => ({
    table: [],
    selectColumn: "",
    selectOption: "",
    input: "",
    n: 5,
  }),

  methods: {
    resetOption() {
      this.selectColumn = "";
      this.selectOption = "";
      this.input = "";
      this.n = 5;
    },
    moreContent() {
      this.n += 2;
    },
    showBtnPag() {
      this.n = 5;
    },
  },

  computed: {
    tableFilter() {
      return this.table
        .map((row) => ({
          item: row,
          visible:
            (this.selectColumn === "Название" &&
            this.selectOption === "Содержит" &&
            !row.name.includes(this.input)
              ? true
              : false) ||
            (this.selectColumn === "Название" &&
            this.selectOption === "Равно" &&
            row.name !== this.input
              ? true
              : false) ||
            (this.selectColumn === "Количество" &&
            this.selectOption === "Равно" &&
            row.amount !== Number(this.input)
              ? true
              : false) ||
            (this.selectColumn === "Количество" &&
            this.selectOption === "Содержит" &&
            !String(row.amount).includes(this.input)
              ? true
              : false) ||
            (this.selectColumn === "Количество" &&
            this.selectOption === "Больше" &&
            row.amount <= Number(this.input)
              ? true
              : false) ||
            (this.selectColumn === "Количество" &&
            this.selectOption === "Меньше" &&
            row.amount >= Number(this.input)
              ? true
              : false) ||
            (this.selectColumn === "Расстояние" &&
            this.selectOption === "Равно" &&
            row.distance !== Number(this.input)
              ? true
              : false) ||
            (this.selectColumn === "Расстояние" &&
            this.selectOption === "Содержит" &&
            !String(row.distance).includes(this.input)
              ? true
              : false) ||
            (this.selectColumn === "Расстояние" &&
            this.selectOption === "Больше" &&
            row.distance <= Number(this.input)
              ? true
              : false) ||
            (this.selectColumn === "Расстояние" &&
            this.selectOption === "Меньше" &&
            row.distance >= Number(this.input)
              ? true
              : false),
        }))
        .slice(0, this.n);
    },
    showButton() {
      return this.n <= this.tableFilter.length ? true : false;
    },
  },

  mounted() {
    fetch("./js/table.json")
      .then((response) => response.json())
      .then((json) => (this.table = json));
  },
};

Vue.createApp(App).mount("#app");
