/*!
 * Copyright (C) 2015 Angel Zaprianov <me@fire1.eu>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * Duplicate Fields version: 1.1.2
 */

(function ($) {
    $.fn.duplicateElement = function (options) {
        options = $.extend($.fn.duplicateElement.defaults, options);
        var main = this;
        var $main = $(main).parent();

        function handleNavigationButtons(ElementTarget) {
            ElementTarget = ElementTarget.parent();
            ElementTarget.find(options.class_remove).show();
            ElementTarget.find(options.class_remove).last().hide();
            ElementTarget.find(options.class_create).hide();
            ElementTarget.find(options.class_create).last().show();
        }

        /**
         * Generate new element
         * @param target
         * @param newElement
         */
        function createElement(target, newElement) {
            clickNewExecutor(newElement);
            target.parent().append(newElement);
        }


        /**
         * Generate new fild on click
         * @param ElementTarget
         */
        function clickNewExecutor(ElementTarget) {
            console.log(ElementTarget);
            ElementTarget.find(options.class_create).unbind();
            ElementTarget.on("click", options.class_create, function (event) {
                var newElement,
                    isGenerate = $(this).parent(".dinamic-field"),
                    isStatic = $(this).parent();
                if (isGenerate.length > 0) {
                    //console.log('generated');
                    newElement = isGenerate.clone();
                } else if (isStatic.length > 0) {
                    //console.log($(main));
                    newElement = ElementTarget.clone().addClass("dinamic-field");
                }
                //
                // Handle view of buttons
                createElement(ElementTarget, newElement);
                //
                // Add remove listener
                clickRemoveExecutor(ElementTarget);
                //
                // Callback function on create
                if (typeof options.onCreate === "function") {
                    options.onCreate(newElement, $(this), event);
                }
                //
                // Manage buttons
                handleNavigationButtons(ElementTarget);
                //
                // Prevent Default
                event.preventDefault();
                return false;
            });
        }

        function clickRemoveExecutor(ElementTarget) {
            ElementTarget.on("click", options.class_remove, function (event) {
                var isGenerate = $(this).parents(".dinamic-field");
                var isStatic = $(this).parents(ElementTarget);
                if (isGenerate.length > 0) {
                    isGenerate.remove();
                } else if (isStatic.length > 0) {
                    ElementTarget.empty();
                    ElementTarget.hide();
                    ElementTarget.remove();
                }
                //
                // Callback function on remove
                if (typeof options.onRemove === "function") {
                    options.onRemove($(this));
                }
                //
                // Manage buttons
                handleNavigationButtons(ElementTarget);
                //
                // Prevent Default
                event.preventDefault();
                return false;
            });
        }

        return this.each(function () {
            var target = $(this);
            handleNavigationButtons(target);
            //
            // Generate new field on click
            clickNewExecutor(target);
            //
            // Hide remove button
            target.find(options.class_remove).first().hide();
            //
            // Remove operation
            clickRemoveExecutor(target)

        });
    };
    //
    // Set up the default options.
    $.fn.duplicateElement.defaults = {
        tag_name: 'div',
        tag_id: "#dinamic-fields",
        clone_model: "#clone-field-model",
        class_remove: ".remove-this-fields",
        class_create: ".create-new-fields",
        onCreate: "",
        onRemove: ""
    };
})(jQuery);