import { gql } from "@apollo/client";
export default class FilterValues {
  select: string;
  search: string;
  res: any;
  query: string;
  typeField: string;
  pageNumber: number;
  constructor(
    select = "characters",
    search = "",
    typeField = "name",
    page = 1
  ) {
    this.select = select;
    this.search = search;
    this.res = {};
    this.query = `query getDinamicQueries`;
    this.typeField = typeField;
    this.pageNumber = page;
  }

  handle() {
    this.type();
    this.selectSchema();
    this.pagination();
    this.data();
    return gql`
      ${this.query}
    `;
  }
  variables() {
    return {
      filter: {
        [this.typeField]: this.search,
      },
      page: this.pageNumber,
    };
  }

  type() {
    switch (this.select) {
      case "characters":
        this.query = `${this.query} ($page: Int, $filter: FilterCharacter)`;
        break;
      case "locations":
        this.query = `${this.query} ($page: Int, $filter: FilterLocation)`;
        break;
      case "episodes":
        this.query = `${this.query} ($page: Int, $filter: FilterEpisode)`;
        break;
      default:
        this.query = `${this.query} ($page: Int, $filter: FilterCharacter)`;
        break;
    }
  }
  selectSchema() {
    this.query = `${this.query}{
          ${this.select}(page: $page, filter: $filter)`;
  }
  pagination() {
    this.query = `${this.query} {
        info{
          next
          prev
          pages
          count
        }
        `;
  }
  data() {
    switch (this.select) {
      case "characters":
        this.query += `
              results {
                 id
                 name
                 image
              }
          }
      }
          `;
        break;
      case "locations":
        this.query += `
              results {
                  id
                  name
                  dimension
              }
          }
      }
           `;
        break;

      case "episodes":
        this.query += `
              results {
                  id
                  name
                  episode
              }
           }
          }
           `;
        break;
      default:
        this.query += `
              results {
                     id
                     name
                     image
                  }
              }
          }
              `;
        break;
    }
  }
}
