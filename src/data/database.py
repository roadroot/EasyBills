import sqlite3
from dataclasses import dataclass


class Database:
	"""Allows the creation and oppening of a database in the specified path.
	If it fails an error will be logged in the console and no exception will be thrown.
	You need to close it after using to commit changes

	Args:
			path (str): The path where to create the database. This path should include the database name and extension.

	Attributes:
			db (sqlite3.Connection): The sql connection, it allows executing queries
	"""

	def __init__(self, path: str):
		try:
				self.db = sqlite3.connect(path)
		except Error as e:
				print(f"The error '{e}' occurred")

	def close(self) -> None:
		'''
		Commiting changes and closing the database correctly.
		'''
		self.db.commit()
		self.db.close()


class Attribute:
	"""
		An sql Attribute, it simplifies creating and handling sql attributes
		In order to use this class use str function

		Args and Attributes:
				attr (str): Attribute name
				data_type (str): Attribute type: one of {INTEGER, REAL, TEXT},
						other types can be accepted but may cause unexpected behaviour
				additionalProperties (str): (default = '') additional properties (FOREIGN KEY, UNIQUE, ...)
				primaryKey (bool): (default = False) if Primary Key
				nullable (bool): if NULL can be inserted
	"""

	def __init__(self, attr: str, data_type: str, additionalProperties: str = '', primaryKey: bool = False, nullable: bool = True):
		self.attr = attr
		self.data_type = data_type
		self.additionalProperties = additionalProperties
		self.primaryKey = primaryKey
		self.nullable = nullable

	def __str__(self):
		format = f"{self.attr} {self.data_type}"
		if len(self.additionalProperties) > 0:
			format += ' ' + self.additionalProperties

		if not self.nullable:
			format += ' NOT NULL'

		if self.primaryKey:
			format += ' PRIMARY KEY'
		return format


class Table:
	"""
		Simplified sql table. This class simplifies create, deleting, handling sql tables.

		Args and Attributes:
				`db` (sqlite3.Connection): sql connection.
						You can get one by creating a Database instance and accessing database.db.
				`name` (str): table name.
				`attributes` (list<Attribute>): sql attributes of the database.

		Args:
				`create` (bool): (default = True) will the table be created.
				`ifNotExists` (bool): (default = True)
						if `True`: Open table if exists else create it.
						if `False`: Create table if not exists else raise an error.

	"""

	def __init__(self, db: sqlite3.Connection, name: str, attributes: list = [], create: bool = True, ifNotExists: bool = True):
		self.name = name
		self.attributes = attributes
		self.db = db
		if create:
			st = 'CREATE TABLE '
			if ifNotExists:
				st += 'IF NOT EXISTS '
			self.db.execute(st + str(self))
			self.db.commit()

	def __str__(self):
		format = ''
		for atr in self.attributes:
			format += ', ' + str(atr)
		format = self.name + '(' + format[2:] + ')'
		return format

	def insert(self, values: list, keys: list = None, commit: bool = True) -> None:
		'''
		Insert row in table.

		Parameters
				`values` (`list`): List of values.
				`keys` (`list`): List of keys (default = `None`).
						If none specified insert only values.
				`commit` (`bool`): Commit changes. It consumes time. Make it False if you know what you're doing.
		'''

		rq = ''
		if keys != None:
			for key in keys:
				rq += ', ' + key
			rq = '(' + rq[2:] + ')'
		rq = 'INSERT INTO ' + self.name + rq + ' VALUES('
		for val in values:
			if val == None:
				rq += 'NULL, '
			elif type(val) == str:
				rq += '\'' + val.replace('\'', '\'\'') + '\', '
			else:
				rq += str(val) + ', '
		rq = rq[:-2] + ')'
		try:
			self.db.execute(rq)
		except:
			print(rq)
		if commit:
			self.db.commit()

	@staticmethod
	def from_dataset(db: sqlite3.Connection, name: str, dic: dict, ifNotExists=True):
		'''
		Create a database from dict.
		`db` (sqlite3.Connection): sql connection.
				You can get one by creating a Database instance and accessing database.db.
		`name` (str): table name.
		`dic` (dict): dict where to get data
		`ifNotExists` (bool): (default = True)
				if `True`: Open table if exists else create it.
				if `False`: Create table if not exists else raise an error.
		'''
		tb = Table(db, name, DatasetUtils.generate_attributes(
			DatasetUtils.preprocess(dic)), ifNotExists=ifNotExists)
		for i in dict[dic.keys()]:
			values = []
			for key in dic.keys():
				values.append(dict[key])
			tb.insert(values, commit = False)
		db.commit()
		return tb

class DatasetUtils:
	@staticmethod
	def preprocess(dic: dict) -> dict:
		'''
				Preprocess dataset: Remove spaces in columns and special caracters.

				`dataset` (DataFrame): the dataset to process.
		'''
		prodic = {}
		for key in dic.keys():
			pcol = DatasetUtils.process_string(key)
			prodic[pcol] = {'values': dic[key]}
			for i in range(len(dic[key])):
				if dic[key][i] == '-':
					dic[key][i] = 0.
			types = [str.__name__ if it == '-' else type(it).__name__ for it in dic[key] if it != 'n.d.' and type(it) != None]
			prodic[pcol]['data_type'] = 'str' if 'str' in types else types[0]

		return prodic


	@staticmethod
	def generate_attributes(dic: dict) -> list:
		'''
				Create `Attribute` array from a dict.

				`dic` (`dict`): the dict to create attributes from.
		'''
		return [Attribute(col, DatasetUtils.py_to_sql_type(dic[col]['data_type'])) for col in dic.keys()]

	@staticmethod
	def py_to_sql_type(type: str) -> str:
		'''
				Transporm `python` type to `sql` type
				`type` (`str`): python type
		'''
		if type == 'int':
			return 'INTEGER'
		elif type == 'str':
			return 'TEXT'
		elif type == 'double':
			return 'REAL'
		elif type == 'float':
			return 'REAL'
		else:
			return None

	@staticmethod
	def process_string(string: str) -> str:
		'''
		Remove spaces and forbidden caracters
		`string`: `str` to format
		'''
		return string.replace('\'', '').replace('â', 'a').replace('à', 'e').replace('è', 'e').replace('é', 'e').replace('/', ' ').replace('(', ' ').replace(')', ' ').replace('  ', ' ').replace(' ', '_')