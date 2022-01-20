class Thing {
  static client = null;
  static tableName = 'things';
  static attributes = {
    body: 'string',
  };

  static async create(values) {
    const insertAttrs = Object.entries(this.attributes)
      .filter(([attr]) => attr in values)
      .map(([attr]) => attr);
    const insertStrAttrs = insertAttrs
      .map((attr) => `"${attr}"`)
      .join(',');
    const insertStrValues = insertAttrs
      .map((attr) => {
        const value = values[attr];
        return typeof value === 'string' ? `'${value}'` : value;
      })
      .join(',');
    const { rows } = await this.client.query(`
         INSERT INTO ${this.tableName} (${insertStrAttrs})
         VALUES (${insertStrValues})
         RETURNING *;
      `);
    return rows;
  }

  static async findAll() {
    const { rows } = await this.client.query(`
      SELECT * FROM ${this.tableName};
      `);
    return rows;
  }
  static async findByPk(valuePk) {
    const { rows } = await this.client.query(`
      SELECT * FROM ${this.tableName}
      WHERE "id"=${valuePk};
   `);
    return rows;
  }

  static async updateByPk(valuePk, values) {
    const updateAttrs = Object.entries(this.attributes)
      .filter(([attr]) => attr in values)
      .map(([attr]) => attr);
    const updateStrAttrsAndValues = updateAttrs
      .map((attr) => {
        const value = values[attr];
        return `"${attr}"=${
          typeof value === 'string' ? `'${value}'` : value
        }`;
      })
      .join(',');
    const { rows } = await this.client.query(`
         UPDATE ${this.tableName} 
         SET ${updateStrAttrsAndValues},"updatedAt"=default
         WHERE "id"=${valuePk}
         RETURNING *;
      `);
    return rows;
  }
  static async deleteByPk(valuePk) {
    const { rows } = await this.client.query(`
      DELETE FROM ${this.tableName}
      WHERE "id"=${valuePk}
      RETURNING *;
   `);
    return rows;
  }
}

module.exports = Thing;
